import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE } from '@/lib/admin-auth';
import { readData, writeData } from '@/lib/dataStore';
import { newsItems } from '@/data/news';
import { breeds } from '@/data/breeds';
import { funFacts } from '@/data/funFacts';
import { products } from '@/data/products';
import { services } from '@/data/services';

const ALLOWED_TYPES = ['news', 'breeds', 'facts', 'products', 'services'] as const;
type DataType = (typeof ALLOWED_TYPES)[number];

function getFallback(type: DataType): unknown[] {
  switch (type) {
    case 'news': return newsItems;
    case 'breeds': return breeds;
    case 'facts': return funFacts;
    case 'products': return products;
    case 'services': return services;
  }
}

function isAuthorized(): boolean {
  const cookieStore = cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE;
}

export async function GET(_request: Request, { params }: { params: { type: string } }) {
  if (!isAuthorized()) {
    return NextResponse.json({ message: '未授权' }, { status: 401 });
  }
  const type = params.type as DataType;
  if (!ALLOWED_TYPES.includes(type)) {
    return NextResponse.json({ message: '未知类型' }, { status: 400 });
  }
  return NextResponse.json(readData(type, getFallback(type)));
}

export async function PUT(request: Request, { params }: { params: { type: string } }) {
  if (!isAuthorized()) {
    return NextResponse.json({ message: '未授权' }, { status: 401 });
  }
  const type = params.type as DataType;
  if (!ALLOWED_TYPES.includes(type)) {
    return NextResponse.json({ message: '未知类型' }, { status: 400 });
  }
  try {
    const data = await request.json();
    if (!Array.isArray(data)) {
      return NextResponse.json({ message: '数据格式错误' }, { status: 400 });
    }
    writeData(type, data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: '解析失败' }, { status: 400 });
  }
}
